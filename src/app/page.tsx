import { AppointmentForm } from '@/components/appointment-form';
import { DatePicker } from '@/components/date-picker';
import { PeriodSection } from '@/components/period-section/period-section';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { groupAppointmentByPeriod } from '@/utills/appoitment-utills';
import { endOfDay, startOfDay } from 'date-fns';

// força essa página a ser dinâmica (sem cache estático)
export const dynamic = 'force-dynamic';

type HomeProps = {
    searchParams: Promise<{
        date?: string;
    }>;
};

export default async function Home({ searchParams }: HomeProps) {
    // 👉 searchParams agora é uma Promise, então precisamos dar await
    const resolvedSearchParams = await searchParams;
    const dateParam = resolvedSearchParams.date;

    // Data base vinda da URL (?date=yyyy-MM-dd) ou hoje
    const baseDate = (() => {
        if (!dateParam) return new Date();

        const [year, month, day] = dateParam.split('-').map(Number);
        return new Date(year, month - 1, day);
    })();

    const dayStart = startOfDay(baseDate);
    const dayEnd = endOfDay(baseDate);

    const appointments = await prisma.appointment.findMany({
        where: {
            scheduleAt: {
                gte: dayStart,
                lte: dayEnd,
            },
        },
        orderBy: {
            scheduleAt: 'asc',
        },
    });

    return <div className="bg-background-primary p-6"></div>;
}
