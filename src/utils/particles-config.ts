import { ThemeEnum } from '@/enums/globalEnums'
import type { ISourceOptions } from 'tsparticles'

export const particlesOption = (theme: ThemeEnum): ISourceOptions => {
    return {
        backgroundMode: {
            enable: true,
            zIndex: 0
        },
        fpsLimit: 60,
        interactivity: {
            detectsOn: 'canvas',
            events: {
                onClick: { enable: true, mode: 'repulse' },
                onHover: {
                    enable: true,
                    mode: 'bubble',
                    parallax: { enable: false, force: 2, smooth: 10 }
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 0.3,
                    opacity: 1,
                    size: 4
                },
                grab: { distance: 400, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
                repulse: { distance: 200, duration: 0.4 }
            }
        },
        particles: {
            color: { value: theme === ThemeEnum.LIGHT ? '#000' : '#fff' },
            move: {
                attract: { enable: false, rotateX: 600, rotateY: 1200 },
                direction: 'bottom-left',
                enable: true,
                outMode: 'out',
                random: false,
                size: true,
                speed: 1,
                straight: false
            },
            number: { density: { enable: true, area: 800 }, value: 400 },
            opacity: {
                random: true,
                value: 0.5
            },
            shape: {
                type: 'star'
            },
            size: {
                random: true,
                value: 10
            }
        },
        detectRetina: true
    }
}
