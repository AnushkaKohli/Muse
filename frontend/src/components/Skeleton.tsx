const Skeleton = () => {
    return (
        <div className="flex justify-center pt-16">
            <div className="flex flex-col justify-center w-5/6 gap-7 lg:w-1/2 md:w-2/3">
                <p
                    className="h-4 bg-gray-200 rounded-full"
                    style={{ width: "40%" }}></p>

                <ul className="mt-5 space-y-3">
                    <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                    <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                    <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                    <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                </ul>
                <p
                    className="h-4 bg-gray-200 rounded-full"
                    style={{ width: "40%" }}></p>

                <ul className="mt-5 space-y-3">
                    <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                    <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                    <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                    <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                </ul>
                <p
                    className="h-4 bg-gray-200 rounded-full"
                    style={{ width: "40%" }}></p>

                <ul className="mt-5 space-y-3">
                    <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                    <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                    <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                    <li className="w-full h-4 bg-gray-200 rounded-full"></li>
                </ul>
            </div>
        </div>
    )
}

export default Skeleton
