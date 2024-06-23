import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Carosal from '../Carosal/AluminiCarosal'
import Section from '../Section/Section'
import Container from '../../layout/Container/Container'


interface WorkflowStep {
    title: string;
    description: string;
}

interface Workflow {
    step1: WorkflowStep;
    step2: WorkflowStep;
    step3: WorkflowStep;
    step4: WorkflowStep;
}



function Intro() {

    const { t } = useTranslation(['landingPage'])
    const { step1, step2, step3, step4 } = t('workflow', { returnObjects: true }) as Workflow


    const workflow = useMemo(() => [
        {
            title: step1.title,
            description: step1.description,
            imageUrl: "/Images/walkthrough/login1.webp",
            blurHash: "L6K1|7M^00%gT}WZbdRN4T%M5HD%"

        },
        {
            title: step2.title,
            description: step2.description,
            imageUrl: "/Images/walkthrough/session2.webp",
            blurHash: "LAIY8[Mc0G.SGKt8-,IAOttR#iR5"
        },
        {
            title: step3.title,
            description: step3.description, imageUrl: "/Images/walkthrough/learn3.webp",
            blurHash: "LEHVF_n$0%NG*0j?RPWCkno#NfjE"
        },
        {
            title: step4.title,
            description: step4.description,
            imageUrl: "/Images/walkthrough/gain4.webp",
            blurHash: "LAIY8[Mc0G.SGKt8-,IAOttR#iR5"
        }
    ], [step1, step2, step3, step4])

    return (
        <Container className='md:px-14 mx-auto mb-5'>
            <Carosal />

            {workflow.map((item, index) => <Section key={item.title} {...item} description={item.description} imagePosition={index % 2 == 0 ? 'left' : 'right'} />)}
        </Container>
    )
}

export default Intro
