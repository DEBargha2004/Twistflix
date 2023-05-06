export function handleGlobalPlayer({setGlobalTrailer,navigate,localTrailer}) {
    console.log(localTrailer);
    setGlobalTrailer(localTrailer)
    navigate('/player')
}