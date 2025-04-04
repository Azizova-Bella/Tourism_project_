'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '@/components/language-provider'
import { gsap } from 'gsap'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Search, MapPin } from 'lucide-react'

export default function CatalogPage() {
	const { t } = useTranslation()
	const headerRef = useRef<HTMLDivElement>(null)
	const catalogRef = useRef<HTMLDivElement>(null)

	const [searchTerm, setSearchTerm] = useState('')
	const [regionFilter, setRegionFilter] = useState('all')

	useEffect(() => {
		if (headerRef.current) {
			gsap.fromTo(
				headerRef.current,
				{ opacity: 0, y: -30 },
				{ opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
			)
		}
		if (catalogRef.current) {
			const items = catalogRef.current.querySelectorAll('.catalog-item')
			gsap.fromTo(
				items,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					stagger: 0.1,
					ease: 'power2.out',
				}
			)
		}
	}, [])

	const destinations = [
		{
			id: 1,
			name: 'pamir_mountains',
			region: 'gbao',
			image: 'https://trektajikistan.com/wp-content/uploads/2021/08/yashilkul-pamir-3.jpg',
			description: 'pamir_description',
			price: '$120',
		},
		{
			id: 2,
			name: 'fann_mountains',
			region: 'sughd',
			image: 'https://www.journalofnomads.com/wp-content/uploads/2019/10/Fann-Mountains-Tajikistan.jpg',
			description: 'fann_description',
			price: '$95',
		},
		{
			id: 3,
			name: 'iskanderkul',
			region: 'sughd',
			image: 'https://exploretraveloasis.com/wp-content/uploads/2023/03/Iskanderkul-Lake-4-.jpeg',
			description: 'iskanderkul_description',
			price: '$85',
		},
		{
			id: 4,
			name: 'dushanbe',
			region: 'central',
			image: 'https://www.tajmedun.tj/upload/iblock/4db/298007340_403203678574336_3210165007052365267_n.jpg',
			description: 'dushanbe_description',
			price: '$70',
		},
		{
			id: 5,
			name: 'khujand',
			region: 'sughd',
			image: 'https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/07/03/57785b11f989826ab04b310f372e9989_1000x1000.jpg',
			description: 'khujand_description',
			price: '$80',
		},
		{
			id: 6,
			name: 'wakhan_corridor',
			region: 'gbao',
			image: 'https://adventure.com/wp-content/uploads/2018/05/Hero-Afghanistan-five-years-on-The-Whakan-Photo-credit-Tracey-Croke-1920x1080.jpg',
			description: 'wakhan_description',
			price: '$150',
		},
	]

	const regions = [
		{ value: 'all', label: 'all_regions' },
		{ value: 'gbao', label: 'gbao' },
		{ value: 'sughd', label: 'sughd' },
		{ value: 'central', label: 'central' },
		{ value: 'khatlon', label: 'khatlon' },
	]

	const filteredDestinations = destinations.filter(dest => {
		const matchesSearch =
			t(dest.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
			t(dest.description).toLowerCase().includes(searchTerm.toLowerCase())
		const matchesRegion = regionFilter === 'all' || dest.region === regionFilter
		return matchesSearch && matchesRegion
	})

	return (
		<div className='min-h-screen'>
			<div ref={headerRef} className='bg-primary py-12 px-4 md:px-8 lg:px-16'>
				<div className='container mx-auto'>
					<h1 className='text-3xl md:text-4xl font-bold mb-6 text-primary-foreground text-center'>
						{t('destinations_catalog')}
					</h1>
					<div className='max-w-3xl mx-auto bg-card rounded-lg p-4 shadow-lg'>
						<div className='flex flex-col md:flex-row gap-4'>
							<div className='flex-1 relative'>
								<Search
									className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'
									size={18}
								/>
								<Input
									placeholder={t('search_destinations')}
									value={searchTerm}
									onChange={e => setSearchTerm(e.target.value)}
									className='pl-10'
								/>
							</div>
							<Select value={regionFilter} onValueChange={setRegionFilter}>
								<SelectTrigger className='w-full md:w-[180px]'>
									<SelectValue>
										{t(regionFilter === 'all' ? 'all_regions' : regionFilter)}
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									{regions.map(region => (
										<SelectItem key={region.value} value={region.value}>
											{t(region.label)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</div>
			<div className='py-16 px-4 md:px-8 lg:px-16 bg-background'>
				<div className='container mx-auto'>
					<div
						ref={catalogRef}
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
					>
						{filteredDestinations.length > 0 ? (
							filteredDestinations.map(destination => (
								<Card
									key={destination.id}
									className='catalog-item overflow-hidden'
								>
									<div className='relative h-48'>
										<Image
											src={destination.image || '/placeholder.svg'}
											alt={t(destination.name)}
											fill
											className='object-cover'
										/>
									</div>
									<CardContent className='p-6'>
										<div className='flex items-center mb-2'>
											<MapPin size={16} className='text-primary mr-2' />
											<span className='text-sm text-muted-foreground'>
												{t(destination.region)}
											</span>
										</div>
										<h3 className='text-xl font-semibold mb-2 text-primary'>
											{t(destination.name)}
										</h3>
										<p className='text-muted-foreground mb-4 line-clamp-3'>
											{t(destination.description)}
										</p>
										<div className='font-bold text-lg text-primary'>
											{destination.price}
										</div>
									</CardContent>
									<CardFooter className='px-6 pb-6 pt-0'>
										<Button className='w-full'>{t('view_details')}</Button>
									</CardFooter>
								</Card>
							))
						) : (
							<div className='col-span-full text-center py-12'>
								<p className='text-xl text-muted-foreground'>
									{t('no_destinations_found')}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
