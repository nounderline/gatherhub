import ModuleBox from './ModuleBox'
import PageHeadline from './PageHeadline'
import Purchase from './components/Purchase'

export default ({}) => {
  return (
    <>
      <Purchase />

      <div className="text-center align-center">
        <img
          src="/ethwarsaw-cover.png"
          className="inline h-64"
          style={{ marginTop: -120 }}
        />
        <h1 className="text-4xl font-bold">ETHWarsaw Hackathon</h1>
        <div className="text-2xl mt-4">1-4 September 2022</div>
        <div className="mt-2">Warsaw, Poland</div>
      </div>

      <div className="grid grid-cols-3 auto-rows-fr gap-8 max-w-8xl m-auto mt-8 mb-32">
        <ModuleBox to="/news">
          <PageHeadline
            icon="📣"
            title="Announcements"
            subtitle="Be in the loop about what's happening."
            small={true}
          />
        </ModuleBox>

        <ModuleBox to="/chat">
          <PageHeadline
            icon="💬"
            title="Chat"
            subtitle="Talk with all participants."
            small={true}
          />
        </ModuleBox>

        <ModuleBox to="/participants">
          <PageHeadline
            icon="👽"
            title="Participants"
            subtitle="See who you gonna meet on the stage!"
            small={true}
          />
        </ModuleBox>

        <ModuleBox to="/schedule">
          <PageHeadline
            icon="🗓"
            title="Schedule"
            subtitle="See who you gonna meet on the stage!"
            small={true}
          />
        </ModuleBox>

        <ModuleBox to="/location">
          <PageHeadline
            icon="📍"
            title="Location"
            subtitle="See who you gonna meet on the stage!"
            small={true}
          />
        </ModuleBox>

        <ModuleBox to="/deals">
          <PageHeadline
            icon="💸"
            title="Deals"
            subtitle="Special offers for accommodation and food for all participants."
            small={true}
          />
        </ModuleBox>
      </div>
    </>
  )
}
