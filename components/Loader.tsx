import Image from "next/image"

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image 
        alt="loader"
        src="/images/spinner.svg" 
        width={50} 
        height={50} 
      />
      </div>
  )
}

export default Loader