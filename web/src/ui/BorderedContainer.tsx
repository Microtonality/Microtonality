import * as React from 'react'

export default function BorderedContainer(props: {
    children: any
    className?: string
})
{
    return <div className={"border-gold border-2 rounded-xl bg-bglight " + props.className}>{props.children}</div>
}
