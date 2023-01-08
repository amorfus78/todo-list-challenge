const TabItem = (props) => {
  const { tab, setSelectedTab, selectedTab } = props

  const selectTab = () => {
    setSelectedTab(tab.id)
  }

  const totalTasks = tab.content.length
  const completedTasks = tab.content.filter((item) => {
    return item.checked
  }).length

  const greyed = selectedTab == tab.id ? true : false

  const unselected =
    "flex flex-row flex-grow border-2 border-slate-300 justify-between rounded-t"

  const selected =
    "flex flex-row flex-grow border-2 border-slate-300 justify-between rounded-t bg-slate-400"

  return (
    <div className={greyed ? selected : unselected} onClick={() => selectTab()}>
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
  )
}

export default TabItem
