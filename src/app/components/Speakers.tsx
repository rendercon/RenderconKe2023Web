"use client"

import { use, useEffect, useId, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from './Container'
import { DiamondIcon } from './DiamondIcon'

import { days } from '@/utils/speakers'
import { Button } from './Button'
import Link from 'next/link'





type ImageClipPathsProps = {
    id: string;
}

function ImageClipPaths({ id, ...props }: ImageClipPathsProps) {
  return (
    <svg aria-hidden="true" width={0} height={0} {...props}>
      <defs>
        <clipPath id={`${id}-0`} clipPathUnits="objectBoundingBox">
          <path d="M0,0 h0.729 v0.129 h0.121 l-0.016,0.032 C0.815,0.198,0.843,0.243,0.885,0.243 H1 v0.757 H0.271 v-0.086 l-0.121,0.057 v-0.214 c0,-0.032,-0.026,-0.057,-0.057,-0.057 H0 V0" />
        </clipPath>
        <clipPath id={`${id}-1`} clipPathUnits="objectBoundingBox">
          <path d="M1,1 H0.271 v-0.129 H0.15 l0.016,-0.032 C0.185,0.802,0.157,0.757,0.115,0.757 H0 V0 h0.729 v0.086 l0.121,-0.057 v0.214 c0,0.032,0.026,0.057,0.057,0.057 h0.093 v0.7" />
        </clipPath>
        <clipPath id={`${id}-2`} clipPathUnits="objectBoundingBox">
          <path d="M1,0 H0.271 v0.129 H0.15 l0.016,0.032 C0.185,0.198,0.157,0.243,0.115,0.243 H0 v0.757 h0.729 v-0.086 l0.121,0.057 v-0.214 c0,-0.032,0.026,-0.057,0.057,-0.057 h0.093 V0" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function Speakers() {

  const [isSSR, setIsSSR] = useState(true);

  let id = useId()
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }: any) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])


  useEffect(() => {
    setIsSSR(false);
  }, [])
  
  const generateRandomSpeakers = (arr: any, count: number) => {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
  };




  return (
    <section
      id="speakers"
      aria-labelledby="speakers-title"
      className="py-20 sm:py-32"
    >
      <ImageClipPaths id={id} />
      {
        isSSR ? null :    
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
              <h2
                id="speakers-title"
                className="font-display text-4xl font-medium tracking-tighter text-slate-300 sm:text-5xl"
              >
                Our Speakers
              </h2>
              <p className="mt-4 font-mono text-2xl tracking-tight text-slate-400">
                Learn from the best in the industry and level up your skills.
                <br />
                Speaker schedule coming out soon!     
              </p>
        </div>
        {/* <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="speakers-title"
            className="font-display text-4xl font-medium tracking-tighter text-slate-300 sm:text-5xl"
          >
            Our Speakers
          </h2>
          <p className="mt-4 font-mono text-2xl tracking-tight text-slate-400">
            Learn from the best in the industry and level up your skills.            
          </p>
        </div> */}
        {/* <Tab.Group
          as="div"
          className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24 lg:grid-cols-4"
          vertical={tabOrientation === 'vertical'}
        >
          <div className="relative -mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:block sm:overflow-visible sm:pb-0">
            <div className="absolute bottom-0 left-0.5 top-2 hidden w-px bg-slate-200 lg:block" />
            <Tab.List className="grid auto-cols-auto grid-flow-col justify-start gap-x-8 gap-y-10 whitespace-nowrap px-4 sm:mx-auto sm:max-w-2xl sm:grid-cols-3 sm:px-0 sm:text-center lg:grid-flow-row lg:grid-cols-1 lg:text-left">

              {({ selectedIndex }) =>
                days.map((day, dayIndex) => (
                  <div key={day.dateTime} className="relative lg:pl-8">
                    <DiamondIcon
                      className={clsx(
                        'absolute left-[-0.5px] top-[0.5625rem] hidden h-1.5 w-1.5 overflow-visible lg:block',
                        dayIndex === selectedIndex
                          ? 'fill-slate-400 stroke-slate-400'
                          : 'fill-transparent stroke-slate-600'
                      )}
                    />
                    <div className="relative">
                      <div
                        className={clsx(
                          'font-mono text-sm',
                          dayIndex === selectedIndex
                            ? 'text-slate-400'
                            : 'text-slate-500'
                        )}
                      >
                        <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                          <span className="absolute inset-0" />
                          {day.name}
                        </Tab>
                      </div>
                      <time
                        dateTime={day.dateTime}
                        className="mt-1.5 block text-2xl font-semibold tracking-tight text-slate-200"
                      >
                        {day.date}
                      </time>
                    </div>
                  </div>
                ))
              }
            </Tab.List>
          </div>
          <Tab.Panels className="lg:col-span-3">
            {days.map((day) => {

              const randomSpeakers = generateRandomSpeakers(day.speakers, 6);
              
              return (
              <Tab.Panel
                key={day.dateTime}
                className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-16 md:grid-cols-3 [&:not(:focus-visible)]:focus:outline-none"
                unmount={false}
              >
                { randomSpeakers.length > 0 ?
                randomSpeakers.map((speaker: any, speakerIndex: number) => (
                  <div key={speakerIndex}>
                    <div className="group relative h-[17.5rem] transform overflow-hidden rounded-4xl">
                      <div
                        className={clsx(
                          'absolute bottom-6 left-0 right-4 top-0 rounded-4xl border transition duration-300 group-hover:scale-95 xl:right-6',
                          [
                            'border-blue-300',
                            'border-indigo-300',
                            'border-sky-300',
                          ][speakerIndex % 3]
                        )}
                      />
                      <div
                        className="absolute inset-0 bg-indigo-50"
                        style={{ clipPath: `url(#${id}-${speakerIndex % 3})` }}
                      >
                        <Image
                          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
                          src={speaker.profilePicture}
                          alt=""
                          priority
                          sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                          layout="fill"
                        />
                      </div>
                    </div>
                    <h3 className="mt-8 font-display text-xl font-bold tracking-tight text-slate-400">
                      {speaker.fullName}
                    </h3>
                    <p className="mt-1 text-base tracking-tight text-slate-500">
                      {speaker.tagLine}
                    </p>
                  </div>
                )) : (
                  <div className="flex flex-col">
                    <h3 className="mt-8 font-display text-xl font-bold tracking-tight text-slate-200">
                      Speakers list coming soon
                    </h3>
                    <p className="mt-1 text-base tracking-tight text-slate-500">
                      Stay tuned for more information on our call for speakers.
                    </p>
                  </div>  
                )}
              </Tab.Panel>
              )
                })}
          </Tab.Panels>
        </Tab.Group> */}
        {/* <div className='flex flex-col lg:flex-row justify-center mt-12 gap-12' >
            <Button>
              <Link 
                href="https://sessionize.com/view/ftr0a860/SpeakerWall?format=Embed_Styled_Html&isDark=True&title=RenderCon%20Kenya%202023" target="_blank" rel="noopener noreferrer">More Speaker info</Link>
            </Button>

            <Button>
              <Link 
                href="https://sessionize.com/view/dkvl0l4d/GridSmart?format=Embed_Styled_Html&isDark=True&title=RenderCon%20Kenya%202023" target="_blank" rel="noopener noreferrer">Event Schedule</Link>
            </Button>
        </div> */}
      </Container>
    }
    </section>
  )
}
