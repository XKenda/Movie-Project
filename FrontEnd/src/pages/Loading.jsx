import LSpinner from "../components/spinner"


const Loading = () => {
    return (
        <div className="loading-con p-40 flex justify-center">
            <div className="loading p-40 flex justify-around text-5xl">
                <LSpinner />
            </div>
        </div>
    )
}

export default Loading;