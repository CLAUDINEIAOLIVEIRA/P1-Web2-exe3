interface ContainerProps {
    titulo: string;
    children: React.ReactNode;
}

function Container({ titulo, children }: ContainerProps) {
    return (
        <section className="container">
            <h2>{titulo}</h2>

            <div className="container-content">
                {children}
            </div>
        </section>
    );
}

export default Container;