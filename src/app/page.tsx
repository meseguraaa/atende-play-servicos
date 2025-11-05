export default function Home() {
    return (
        <div className="bg-background-primary p-6">
            <div className="flex items-center justify-between md:m-8">
                <div>
                    <h1 className="text-title text-content-primary mb-2">
                        Sua Agenda
                    </h1>
                    <p className="text-paragrahp-small text-content-secondary">
                        Aqui você pode ver todos os cliente e serviços agendados
                        para hoje
                    </p>
                </div>
            </div>
        </div>
    );
}
