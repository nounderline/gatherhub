import PageHeadline from './PageHeadline'
import ScheduleItems from './schedule.json'

const Items = ScheduleItems.reverse()

export default ({ items = Items }) => {
  return (
    <>
      <PageHeadline
        icon="🗓"
        title="Schedule"
        subtitle="See who you gonna meet on the stage!"
      />

      <div className="max-w-6xl m-auto mt-24 bg-white pt-12 px-24 border rounded-lg">
        {items.map((item) => {
          return (
            <>
              <h1 className="font-bold text-4xl mt-8 mb-4  text-gray-900 text-center ">
                {item.title}
              </h1>
              {item.events.map((event) => {
                return (
                  <ol className="relative border-l border-gray-200 ">
                    <li className="pb-10 ml-4">
                      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white  "></div>
                      <time className="mb-1 text-sm font-normal leading-none text-gray-400 ">
                        {event.time}
                      </time>

                      <h3 className="text-lg font-semibold text-gray-900 ">
                        {event.title}
                      </h3>
                      {event.speaker && (
                        <span className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                          {event.speaker}
                        </span>
                      )}
                      <p className="text-base font-normal text-gray-500 ">
                        {event.description}
                      </p>
                    </li>
                  </ol>
                )
              })}
            </>
          )
        })}
      </div>
    </>
  )
}
