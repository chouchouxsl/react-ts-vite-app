import React, { useContext, useEffect, useState } from 'react'
import Typed from 'react-typed'
import GroundGlassbg from '@/components/GroundGlassbg'
import { GlobalContext } from '@/context/globalContext'
import useLocale from '@/hooks/useLocale'
import style from './style/index.module.less'

const Home: React.FC = () => {
    const t = useLocale()
    const [typed, setTyped] = useState<any>()
    const { lang } = useContext(GlobalContext)

    useEffect(() => {
        typed && typed.reset()
    }, [lang])

    return (
        <div className={style.pages}>
            <div className={style.ground}>
                <GroundGlassbg radius="30px" blur="8px" height="400px">
                    <div className={style.content}>
                        <h1 className={style.none}>{t['home.title']}</h1>
                        <Typed
                            typeSpeed={80}
                            strings={[t['home.title']]}
                            typedRef={(typed: any) => {
                                setTyped(typed)
                            }}
                        />
                    </div>
                </GroundGlassbg>
            </div>
        </div>
    )
}

export default Home
