import "../styles/About.css"
import AboutCard from "./AboutCard"
import Edu from "../images/Edu.png"

export default function About () {
    const integrantes = [
            {
            name:"Eduardo Carlos Toledo",
            image:<img src={Edu} alt="screen" className='profile_image'/>,
            instagram:"https://www.instagram.com//"},
        ]

    return (
        <div className="about_container">
            {integrantes.map((i) => {
                return (
                    <AboutCard 
                    name={i.name}
                    image={i.image}
                    linkedin={i.linkedin}
                    github={i.github}
                    portfolio={i.portfolio}
                    />
                )
            })}
        </div>
    )
}