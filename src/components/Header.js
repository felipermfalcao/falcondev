import Logo from "./Logo";

export default function Header(props){
    return (
        <div>
            <div>
                <Logo tema={props.tema} />
            </div>

            <div>
               teste
            </div>
        </div>
    );
}