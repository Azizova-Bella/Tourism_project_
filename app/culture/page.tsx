'use client'

import { useEffect, useRef } from 'react'
import { useTranslation } from '@/components/language-provider'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

export default function CulturePage() {
	const { t } = useTranslation()
	const headerRef = useRef<HTMLDivElement>(null)
	const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		if (headerRef.current) {
			gsap.fromTo(
				headerRef.current,
				{ opacity: 0, y: -50 },
				{ opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
			)
		}

		// Sections animation
		sectionRefs.current.forEach((section, index) => {
			if (!section) return

			gsap.fromTo(
				section,
				{ opacity: 0, y: 50 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: section,
						start: 'top 80%',
						toggleActions: 'play none none none',
					},
				}
			)
		})

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
		}
	}, [])

	const culturalAspects = [
		{
			title: 'traditions',
			image: 'https://comunicom.ru/images/Culture/obryadi.jpg',
			description: 'traditions_description',
		},
		{
			title: 'cuisine',
			image:
				'https://traveltajikistan.tj/wp-content/uploads/2023/05/800x600c-center.jpg',
			description: 'cuisine_description',
		},
		{
			title: 'music_dance',
			image:
				'https://central-asia.guide/wp-content/uploads/2023/02/Pamiri-culture-women-raditional-dress-1024x674.jpg',
			description: 'music_dance_description',
		},
		{
			title: 'crafts',
			image:
				'https://www.shutterstock.com/image-photo/traditional-uzbek-cap-named-tubeteika-260nw-329876177.jpg',
			description: 'crafts_description',
		},
	]

	const festivals = [
		{
			name: 'navruz',
			date: 'March 21',
			description: 'navruz_description',
		},
		{
			name: 'mehrgon',
			date: 'October',
			description: 'mehrgon_description',
		},
		{
			name: 'independence_day',
			date: 'September 9',
			description: 'independence_day_description',
		},
	]

	return (
		<div className='min-h-screen'>
			<div
				ref={headerRef}
				className='relative w-full h-[100vh] overflow-hidden flex items-center justify-center'
			>
				<div className='absolute inset-0 z-0'>
					<iframe
						className='w-full h-full pointer-events-none'
						src='https://www.youtube.com/embed/tRyXac-p3hg?autoplay=1&mute=1&loop=1&playlist=tRyXac-p3hg&controls=0&showinfo=0&modestbranding=1&rel=0&cc_load_policy=0'
						title='Tajikistan Culture Video'
						allow='autoplay; fullscreen'
						allowFullScreen
					></iframe>

					<div className='absolute inset-0 bg-gradient-to-b from-black/20 to-black/80'></div>
				</div>

				{/* Content */}
				<div className='relative z-10 text-center px-4 text-white max-w-4xl'>
					<h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-md mb-6 animate-fadeIn'>
						{t('tajik_culture')}
					</h1>
					<p className='text-xl md:text-2xl leading-relaxed drop-shadow-sm animate-fadeIn delay-200'>
						{t('culture_intro')}
					</p>
				</div>
			</div>

			<div
				ref={el => {
					sectionRefs.current[0] = el
				}}
				className='py-16 px-4 md:px-8 lg:px-16 bg-background'
			>
				<div className='container mx-auto'>
					<h2 className='text-3xl font-bold mb-12 text-center text-primary'>
						{t('cultural_heritage')}
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{culturalAspects.map((aspect, index) => (
							<Card key={index} className='overflow-hidden'>
								<div className='relative h-64'>
									<Image
										src={aspect.image || '/placeholder.svg'}
										alt={t(aspect.title)}
										fill
										className='object-cover'
									/>
								</div>
								<CardContent className='p-6'>
									<h3 className='text-2xl font-semibold mb-3 text-primary'>
										{t(aspect.title)}
									</h3>
									<p className='text-muted-foreground'>
										{t(aspect.description)}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>

			<div
				ref={el => {
					sectionRefs.current[1] = el
				}}
				className='py-16 px-4 md:px-8 lg:px-16 bg-muted'
			>
				<div className='container mx-auto'>
					<h2 className='text-3xl font-bold mb-12 text-center text-primary'>
						{t('festivals_celebrations')}
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{festivals.map((festival, index) => (
							<Card key={index} className='h-full'>
								<CardContent className='p-6 h-full flex flex-col'>
									<h3 className='text-2xl font-semibold mb-2 text-primary'>
										{t(festival.name)}
									</h3>
									<p className='text-sm text-muted-foreground mb-4'>
										{festival.date}
									</p>
									<p className='text-muted-foreground flex-grow'>
										{t(festival.description)}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
