import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export function Portal({ children, className, el = "div", onClick }) {
  const [container] = useState(document.createElement(el))

  if (onClick) container.addEventListener("click", onClick)

  if (className) {
    container.classList.add(className)
  }

  useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return createPortal(children, container)
}

export default Portal
