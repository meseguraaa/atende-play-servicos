// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const COMPANY_SLUG = 'atendeplay';
    const COMPANY_NAME = 'AtendePlay';
    const UNIT_NAME = 'Unidade - SBC';

    const ADMIN_EMAIL = 'admin@atendeplay.com.br';
    const PROF_EMAIL = 'jeff@atendeplay.com.br';

    // ✅ NOVO: usuário da plataforma (não depende de CompanyMember/AdminAccess)
    const PLATFORM_EMAIL = 'plataform@atendeplay.com.br';

    const PASSWORD = 'Mesegura@2468';

    const passwordHash = await bcrypt.hash(PASSWORD, 10);

    // 1) Company
    // ✅ Segurança: se já existir, NÃO atualiza nada (evita sobrescrever dados reais)
    const existingCompany = await prisma.company.findFirst({
        where: { slug: COMPANY_SLUG },
    });

    const company = existingCompany
        ? existingCompany
        : await prisma.company.create({
              data: {
                  name: COMPANY_NAME,
                  slug: COMPANY_SLUG,
                  segment: 'BARBERSHOP',
                  isActive: true,
              },
          });

    // 2) Unit
    // ✅ Segurança: se já existir, NÃO atualiza nada (evita sobrescrever dados reais)
    const existingUnit = await prisma.unit.findFirst({
        where: { companyId: company.id, name: UNIT_NAME },
    });

    const unit = existingUnit
        ? existingUnit
        : await prisma.unit.create({
              data: {
                  companyId: company.id,
                  name: UNIT_NAME,
                  isActive: true,
              },
          });

    // 3) ADMIN user (owner)
    const adminUser = await prisma.user.upsert({
        where: { email: ADMIN_EMAIL },
        update: {
            role: 'ADMIN',
            isOwner: true,
            isActive: true,
            passwordHash,
            name: 'Admin',
        },
        create: {
            email: ADMIN_EMAIL,
            name: 'Admin',
            role: 'ADMIN',
            isOwner: true,
            isActive: true,
            passwordHash,
        },
    });

    // 3.1) CompanyMember OWNER (admin)
    await prisma.companyMember.upsert({
        where: {
            companyId_userId: { companyId: company.id, userId: adminUser.id },
        },
        update: {
            role: 'OWNER',
            isActive: true,
            lastUnitId: unit.id,
        },
        create: {
            companyId: company.id,
            userId: adminUser.id,
            role: 'OWNER',
            isActive: true,
            lastUnitId: unit.id,
        },
    });

    // 3.2) AdminAccess (todas permissões true)
    await prisma.adminAccess.upsert({
        where: {
            companyId_userId: { companyId: company.id, userId: adminUser.id },
        },
        update: {
            unitId: unit.id,

            canAccessDashboard: true,
            canAccessReports: true,
            canAccessCheckout: true,
            canAccessAppointments: true,
            canAccessProfessionals: true,
            canAccessServices: true,
            canAccessReviews: true,
            canAccessProducts: true,
            canAccessClients: true,
            canAccessClientLevels: true,
            canAccessFinance: true,
            canAccessSettings: true,
        },
        create: {
            companyId: company.id,
            userId: adminUser.id,
            unitId: unit.id,

            canAccessDashboard: true,
            canAccessReports: true,
            canAccessCheckout: true,
            canAccessAppointments: true,
            canAccessProfessionals: true,
            canAccessServices: true,
            canAccessReviews: true,
            canAccessProducts: true,
            canAccessClients: true,
            canAccessClientLevels: true,
            canAccessFinance: true,
            canAccessSettings: true,
        },
    });

    // 4) PROFESSIONAL user
    const professionalUser = await prisma.user.upsert({
        where: { email: PROF_EMAIL },
        update: {
            role: 'PROFESSIONAL',
            isOwner: false,
            isActive: true,
            passwordHash,
            name: 'Jeff (Profissional)',
        },
        create: {
            email: PROF_EMAIL,
            name: 'Jeff (Profissional)',
            role: 'PROFESSIONAL',
            isOwner: false,
            isActive: true,
            passwordHash,
        },
    });

    // 4.1) CompanyMember STAFF (professional user)
    await prisma.companyMember.upsert({
        where: {
            companyId_userId: {
                companyId: company.id,
                userId: professionalUser.id,
            },
        },
        update: {
            role: 'STAFF',
            isActive: true,
            lastUnitId: unit.id,
        },
        create: {
            companyId: company.id,
            userId: professionalUser.id,
            role: 'STAFF',
            isActive: true,
            lastUnitId: unit.id,
        },
    });

    // 4.2) Professional record (linkado ao User via userId)
    // Professional tem unique (companyId, email)
    const professional = await prisma.professional.upsert({
        where: {
            companyId_email: { companyId: company.id, email: PROF_EMAIL },
        },
        update: {
            name: 'Jeff',
            isActive: true,
            userId: professionalUser.id,
        },
        create: {
            companyId: company.id,
            name: 'Jeff',
            email: PROF_EMAIL,
            isActive: true,
            userId: professionalUser.id,
        },
    });

    // 4.3) Link do Professional na Unit (ProfessionalUnit)
    await prisma.professionalUnit.upsert({
        where: {
            professionalId_unitId: {
                professionalId: professional.id,
                unitId: unit.id,
            },
        },
        update: {
            companyId: company.id,
            isActive: true,
        },
        create: {
            companyId: company.id,
            professionalId: professional.id,
            unitId: unit.id,
            isActive: true,
        },
    });

    // ✅ 5) PLATFORM OWNER user (para testar /plataform)
    // - Não cria CompanyMember
    // - Não cria AdminAccess
    // - Só garante um User com role PLATFORM_OWNER
    const platformUser = await prisma.user.upsert({
        where: { email: PLATFORM_EMAIL },
        update: {
            role: 'PLATFORM_OWNER',
            isOwner: false,
            isActive: true,
            passwordHash,
            name: 'Platform Owner',
        },
        create: {
            email: PLATFORM_EMAIL,
            name: 'Platform Owner',
            role: 'PLATFORM_OWNER',
            isOwner: false,
            isActive: true,
            passwordHash,
        },
    });

    console.log('🌱 Seed concluída!');
    console.log(`Company: ${company.name} (${company.slug ?? '-'})`);
    console.log(`Unit: ${unit.name}`);
    console.log(`ADMIN: ${ADMIN_EMAIL} / ${PASSWORD}`);
    console.log(`PROF: ${PROF_EMAIL} / ${PASSWORD}`);
    console.log(`PLATFORM: ${platformUser.email} / ${PASSWORD}`);
}

main()
    .catch((e) => {
        console.error('❌ Seed falhou:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
