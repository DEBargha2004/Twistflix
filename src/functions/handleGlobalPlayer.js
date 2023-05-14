export function handleGlobalPlayer({setGlobalTrailer,navigate,localTrailer}) {
    setGlobalTrailer(localTrailer)
    navigate('/player')
}