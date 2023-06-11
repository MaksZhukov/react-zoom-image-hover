import { useRef, useState, FC, CSSProperties, MouseEventHandler } from 'react'

interface Props {
	className?: string
	zoomScale: number
	height: string | number
	width: string | number
	src: string
	transitionTime?: number
	style: CSSProperties
}

const Zoom: FC<Props> = ({ className, zoomScale, height, width, style, src, transitionTime = 0.1 }) => {
	const ref = useRef<HTMLDivElement>(null)
	const [zoom, setZoom] = useState<boolean>(false)
	const [mouseX, setMouseX] = useState<number>(0)
	const [mouseY, setMouseY] = useState<number>(0)

	const handleMouseOver = () => {
		setZoom(true)
	}

	const handleMouseOut = () => {
		setZoom(false)
	}

	const handleMouseMovement: MouseEventHandler<HTMLDivElement> = (e) => {
		if (ref.current) {
			const { left: offsetLeft, top: offsetTop } = ref.current.getBoundingClientRect()
			const x = ((e.pageX - offsetLeft - window.scrollX) / ref.current.offsetWidth) * 100
			const y = ((e.pageY - offsetTop - window.scrollY) / ref.current.offsetHeight) * 100
			setMouseX(x)
			setMouseY(y)
		}
	}

	const transform = {
		transformOrigin: `${mouseX}% ${mouseY}%`,
	}

	const innerDivStyle = {
		height: '100%',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'contain',
		transition: `transform ${transitionTime}s ease-out`,
		backgroundImage: `url('${src}')`,
	}

	return (
		<div
			className={className}
			style={{
				...style,
				height,
				width,
				overflow: 'hidden',
			}}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onMouseMove={handleMouseMovement}
			ref={ref}
		>
			<div
				style={{
					...transform,
					...innerDivStyle,
					transform: zoom ? `scale(${zoomScale})` : 'scale(1.0)',
				}}
				className={className}
			/>
		</div>
	)
}

export default Zoom
