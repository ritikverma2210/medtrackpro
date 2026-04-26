import Particles from "react-tsparticles"

export default function ParticlesBG(){

  return (
    <Particles
      options={{
        background:{color:"transparent"},
        particles:{
          number:{value:40},
          size:{value:2},
          move:{speed:4},
          opacity:{value:0.3}
        }
      }}
      className="absolute inset-0 -z-10 pointer-events-none"
    />
  )
}