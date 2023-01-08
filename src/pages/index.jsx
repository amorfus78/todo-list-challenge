/* eslint-disable no-console */
import Head from "next/head"
import TabSelector from "@/components/business/TabSelector"
import TodoList from "@/components/business/TodoList"
import MyForm from "@/components/business/MyForm"
import { useCallback, useState } from "react"

const state = {
  tabs: [
    {
      id: 0,
      label: "todo1",
      content: [
        { id: 0, label: "item1", checked: false },
        { id: 1, label: "item2", checked: true },
      ],
      showCompleted: true,
    },
    {
      id: 1,
      label: "todo3",
      content: [
        { id: 0, label: "item1", checked: false },
        { id: 1, label: "item2", checked: true },
      ],
      showCompleted: true,
    },
    {
      id: 2,
      label: "todo2",
      content: [
        { id: 0, label: "item1", checked: false },
        { id: 1, label: "item2", checked: true },
      ],
      showCompleted: true,
    },
  ],
  selectedTab: 0,
  refresh: false,
}

const initialValues = {
  name: "",
}

const App = () => {
  const [tabs, setTabs] = useState(state.tabs)
  const [selectedTab, setSelectedTab] = useState(state.selectedTab)
  const [isTabFormDisplayed, setIsTabFormDisplayed] = useState(false)
  const [isItemFormDisplayed, setIsItemFormDisplayed] = useState(false)
  const [currentId, setCurrentId] = useState(2)
  const [updated, setUpdated] = useState(state.refresh)
  const [values, setValues] = useState(initialValues)
  const [isUpdatingList, setIsUpdatingList] = useState(false)
  const [updatingItem, setUpdatingItem] = useState(null)

  const getSelectedTabIndex = useCallback(() => {
    var targetIndex = null
    for (let i in tabs) {
      if (tabs[i].id === selectedTab) {
        targetIndex = i
      }
    }

    return targetIndex
  }, [selectedTab, tabs])

  const selectTab = useCallback((tabId) => {
    setSelectedTab(tabId)
  }, [])

  const newTab = useCallback(() => {
    setIsTabFormDisplayed(true)
  }, [])

  const handleTabSubmit = useCallback(
    ({ name }, { resetForm }) => {
      if (!isUpdatingList) {
        const newTab = [
          ...tabs,
          {
            id: currentId + 1,
            label: name,
            content: [],
            showCompleted: true,
          },
        ]

        setCurrentId(currentId + 1)
        setTabs(newTab)
      } else {
        const tabTargetIndex = getSelectedTabIndex()
        tabs[tabTargetIndex].label = name
        setTabs(tabs)
        setIsUpdatingList(false)
        setValues(initialValues)
      }

      resetForm()
      setIsTabFormDisplayed(false)
    },
    [tabs, currentId, getSelectedTabIndex, isUpdatingList]
  )

  const handleItemChkChange = useCallback(
    (itemId) => {
      const tabTargetIndex = getSelectedTabIndex()
      let itemTargetIndex = null

      if (tabTargetIndex != null) {
        for (let i in tabs[tabTargetIndex].content) {
          if (tabs[tabTargetIndex].content[i].id === itemId) {
            itemTargetIndex = i
          }
        }
      }

      if (itemTargetIndex != null) {
        tabs[tabTargetIndex].content[itemTargetIndex].checked =
          !tabs[tabTargetIndex].content[itemTargetIndex].checked

        setTabs(tabs)
      }
    },
    [tabs, getSelectedTabIndex]
  )

  const newItemClick = useCallback((event) => {
    console.log(event)
    setIsItemFormDisplayed(true)
  }, [])

  const handleItemSubmit = useCallback(
    ({ name }, { resetForm }) => {
      const tabTargetIndex = getSelectedTabIndex()

      if (updatingItem == null) {
        tabs[tabTargetIndex].content.push({
          id: currentId + 1,
          label: name,
          checked: false,
        })
        setCurrentId(currentId + 1)
      } else {
        tabs[tabTargetIndex].content[updatingItem].label = name
      }

      setTabs(tabs)
      resetForm()
      setIsItemFormDisplayed(false)
      setUpdatingItem(null)
    },
    [tabs, currentId, getSelectedTabIndex, updatingItem]
  )

  const handleDeleteItem = useCallback(
    (itemId) => {
      const tabTargetIndex = getSelectedTabIndex()
      var targetIndex = null
      for (let i in tabs[tabTargetIndex].content) {
        if (tabs[tabTargetIndex].content[i].id === itemId) {
          targetIndex = i
        }
      }

      delete tabs[tabTargetIndex].content[targetIndex]
      setTabs(tabs)
      setUpdated(!updated)
    },
    [tabs, getSelectedTabIndex, updated]
  )

  const handleDeleteList = useCallback(() => {
    const newTabs = tabs.filter((tab) => {
      return tab.id != selectedTab
    })

    setTabs(newTabs)
    setSelectedTab(newTabs[0].id)
  }, [tabs, selectedTab])

  const showCompleted = useCallback(() => {
    const targetIndex = getSelectedTabIndex()

    tabs[targetIndex].showCompleted = !tabs[targetIndex].showCompleted
    setTabs(tabs)
    setUpdated(!updated)
  }, [tabs, getSelectedTabIndex, updated])

  const editListName = useCallback(() => {
    const targetIndex = getSelectedTabIndex()
    setIsTabFormDisplayed(true)
    setIsUpdatingList(true)
    setValues({ name: tabs[targetIndex].label })
  }, [getSelectedTabIndex, tabs])

  const editItemName = useCallback(
    (itemId) => {
      const targetIndex = getSelectedTabIndex()
      setIsItemFormDisplayed(true)
      setUpdatingItem(itemId)
      setValues({ name: tabs[targetIndex].content[itemId].label })
      console.log(itemId)
    },
    [getSelectedTabIndex, tabs]
  )

  console.log(tabs)
  console.log(selectedTab)

  return (
    <>
      <Head>
        <title>Todo List Challenge</title>
        <meta name="description" content="Todo List Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Todo list</h1>

        <TabSelector
          tabs={tabs}
          setSelectedTab={selectTab}
          selectedTab={selectedTab}
          newTab={newTab}
        />
        <MyForm
          isFormDisplayed={isTabFormDisplayed}
          handleSubmit={handleTabSubmit}
          initialValues={values}
        />
        <MyForm
          isFormDisplayed={isItemFormDisplayed}
          handleSubmit={handleItemSubmit}
          initialValues={values}
        />
        <TodoList
          tabs={tabs}
          selectedTab={selectedTab}
          handleItemChkChange={handleItemChkChange}
          newItemClick={newItemClick}
          handleDeleteItem={handleDeleteItem}
          refresh={updated}
          deleteList={handleDeleteList}
          showCompleted={showCompleted}
          editListName={editListName}
          editItemName={editItemName}
        />
      </main>
    </>
  )
}

export default App
