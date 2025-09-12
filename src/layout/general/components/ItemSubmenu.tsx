import { NavLink } from 'react-router-dom'

interface ItemSubmenuProps {
  to: string
  name: string
}

export function ItemSubmenu({ name, to }: ItemSubmenuProps) {
  return (
    <NavLink to={to} className="">
      <div className="flex flex-row gap-4 duration-300 hover:text-header-hover">
        <span className="">{name}</span>
      </div>
    </NavLink>
  )
}
