const PreLoader = () => {
  return (
    <>
    <div className="preloader">
        <div className="loader">
            Loading...
        </div>
    </div>
    <style jsx>
        {`
            .preloader{ position: fixed; z-index: 9999; width: 100vw; height: 100vh; background-color: #0a0a0a6e; display: grid; place-items:center;}
            .loader {position: absolute; box-shadow: 0 5px 15px rgba(0,0,0,0.1); display: grid; place-items:center; width: 5rem; height: 5rem;background: rgba(255,255,255,0.7); border-radius: 100%; animation:pulse_border 2s ease infinite;}
            
        `}
    </style>
    </>
  )
}

export default PreLoader
