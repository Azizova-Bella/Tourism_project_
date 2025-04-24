'use client'

import { useEffect, useRef } from 'react'
import HomeSlider from '@/components/home-slider'
import FeaturedDestinations from '@/components/featured-destinations'
import TravelPackages from '@/components/travel-packages'
import Testimonials from '@/components/testimonials'
import { useTranslation } from '@/components/language-provider'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Home() {
	const { t } = useTranslation()
	const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		sectionRefs.current.forEach((section, index) => {
			if (!section) return

			gsap.fromTo(
				section,
				{
					y: 50,
					opacity: 0,
				},
				{
					y: 0,
					opacity: 1,
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

	return (
		<div className='min-h-screen'>
			<HomeSlider />

			<div
				ref={el => (sectionRefs.current[0] = el)}
				className='py-16 px-4 md:px-8 lg:px-16 bg-background'
			>
				<div className='container mx-auto'>
					<h2 className='text-3xl md:text-4xl font-bold text-center mb-12 text-primary'>
						{t('welcome_to_tajikistan')}
					</h2>

					<p className='text-lg text-center max-w-3xl mx-auto mb-8 text-muted-foreground'>
						{t('tajikistan_intro')}
					</p>
					<div className='flex justify-center'>
						<a
							href='/culture'
							className='px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'
						>
							{t('discover_more')}
						</a>
					</div>
				</div>
			</div>

			<div
				ref={el => (sectionRefs.current[1] = el)}
				className='py-16 px-4 md:px-8 lg:px-16 bg-muted'
			>
				<FeaturedDestinations />
			</div>

			<div
				ref={el => (sectionRefs.current[2] = el)}
				className='py-16 px-4 md:px-8 lg:px-16 bg-background'
			>
				<TravelPackages />
			</div>

			<div
				ref={el => (sectionRefs.current[3] = el)}
				className='py-16 px-4 md:px-8 lg:px-16 bg-muted'
			>
				<Testimonials />
			</div>
		</div>
	)
}
