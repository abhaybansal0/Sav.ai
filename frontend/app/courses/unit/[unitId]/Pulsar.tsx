

const Pulsar = ({ intensity = 1, speed = 2 }) => {

    return (
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            {/* Neutron star core */}
            <div className="absolute w-8 h-8 rounded-full bg-gradient-radial from-blue-200 to-blue-600 animate-pulse" />

            {/* Rotating beam */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: `${speed}s` }}>
                <div className="absolute top-0 left-1/2 w-1 h-12 -translate-x-1/2 bg-gradient-to-t from-blue-400 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-1/2 w-1 h-12 -translate-x-1/2 bg-gradient-to-b from-blue-400 to-transparent opacity-80" />
            </div>

            {/* Magnetic field lines */}
            <div className="absolute inset-0 rounded-full border border-blue-300/20 animate-pulse" />
            <div className="absolute inset-2 rounded-full border border-blue-400/15 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
    )
}


export default Pulsar