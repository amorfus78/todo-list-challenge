const ProgressBar = (props) => {
  const { completedTasks, totalTasks } = props
  const fullBar = "h-2 w-full bg-slate-500"

  const childBar = "h-2 bg-green-400"

  const progress = Math.floor((completedTasks / totalTasks) * 100)

  return (
    <div className={fullBar}>
      <div className={childBar} style={{ width: progress + "%" }}></div>
    </div>
  )
}

export default ProgressBar
