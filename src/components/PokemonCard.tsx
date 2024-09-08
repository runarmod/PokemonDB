import "../styles/PokemonCard.css";
import charmander from "../assets/004.png";

interface PokemonCardInterface {
    id: string;
    name: string;
    height: number;
    weight: number;
    gender: "Male" | "Female";
    type: string;
    abilities: string[];
}

const PokemonCard = ({
    id,
    name,
    height,
    weight,
    gender,
    type,
    abilities,
}: PokemonCardInterface) => {
    return (
        <article id="PokemonCardContainer">
            <figure id="ImageContainer">
                <img src={charmander} alt={`${name} image`} />
            </figure>
            <div id="StatContainer">
                <header>
                    <h1>{name}</h1>
                    <h2 style={{ opacity: 0.5 }}>{id}</h2>
                </header>
                <div id="StatGrid">
                    <section>
                        <h3>Gender</h3>
                        <p>{gender}</p>
                    </section>
                    <section>
                        <h3>Height</h3>
                        <p>{height}</p>
                    </section>
                    <section>
                        <h3>Type</h3>
                        <p>{type}</p>
                    </section>
                    <section>
                        <h3>Width</h3>
                        <p>{weight}</p>
                    </section>
                    <section>
                        <h3>Abilities</h3>
                        <ul>
                            {abilities.map((ability, index) => (
                                <li key={index}>{ability}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </article>
    );
};

export default PokemonCard;
