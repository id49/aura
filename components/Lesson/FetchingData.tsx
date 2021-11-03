const FetchingData = () => (
  <div
    className='container flex items-center justify-center px-6 py-8 mx-auto h-96 bg-gray-200'
    style={{
      height: 580,
      maxHeight: 580
    }}
  >
    <div className='flex flex-col items-center p-5 gap-4'>
      <div className='flex space-x-2 animate-pulse'>
        <div className='w-3 h-3 bg-gray-500 rounded-full'></div>
        <div className='w-3 h-3 bg-gray-500 rounded-full'></div>
        <div className='w-3 h-3 bg-gray-500 rounded-full'></div>
      </div>
    </div>
  </div>
)

export default FetchingData
