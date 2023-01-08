const { default: TabItem } = require("./TabItem")

/* eslint-disable no-console */
const TabSelector = (props) => {
  const { tabs, setSelectedTab, selectedTab, newTab } = props

  const newTabClick = () => {
    console.log("newTab")
    newTab()
  }

  return (
    <>
      <div className="flex flex-row w-full">
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            tab={tab}
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          />
        ))}
        <button onClick={() => newTabClick()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </>
  )
}

export default TabSelector
