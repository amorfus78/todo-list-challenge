import ProgressBar from "./ProgressBar"

const TabItem = (props) => {
  const { tab, setSelectedTab, selectedTab } = props

  const selectTab = () => {
    setSelectedTab(tab.id)
  }

  const totalTasks = tab.content.length
  const completedTasks = tab.content.filter((item) => {
    return item.checked
  }).length

  const primary =
    "flex flex-col flex-grow border-2 border-slate-300 justify-between rounded-t"

  const progressBar = (
    <ProgressBar completedTasks={completedTasks} totalTasks={totalTasks} />
  )

  return (
    <>
      <div className={primary} onClick={() => selectTab()}>
        <div>
          <h1 className="m-2">{tab.label}</h1>
          <div className="flex gap-3 m-2">
            <h1 className="bg-green-500/100 p-1 rounded-full text-white">
              {completedTasks}
            </h1>
            <h1 className="bg-sky-500/100 p-1 rounded-full text-white">
              {totalTasks}
            </h1>
          </div>
        </div>
        {tab.id === selectedTab ? progressBar : null}
      </div>
    </>
  )
}

export default TabItem
