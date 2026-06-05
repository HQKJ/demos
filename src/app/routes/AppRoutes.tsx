import { Navigate, Route, Routes } from 'react-router'
import { PageHelp } from '../help/PageHelp'
import { DemoShell } from '../layout/DemoShell'
import { DemoGallery } from '../pages/DemoGallery'
import { demos } from './demoRegistry'

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<DemoGallery />} path="/" />
        {demos.map((demo) => (
          <Route element={<DemoShell demo={demo} />} key={demo.path} path={demo.path} />
        ))}
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
      <PageHelp />
    </>
  )
}
