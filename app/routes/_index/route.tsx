import { type MetaFunction } from '@remix-run/react'
import styles from './index.module.css'

export const meta: MetaFunction = () => {
  return [
    { title: 'Root - Remix SPA' },
    { name: 'description', content: 'Hello Remix (SPA Mode)!' },
  ]
}

export default function Index() {
  return <h1 className={styles.title}>Hello Remix (SPA Mode)</h1>
}
