import { Users, MessageCircle, Globe, Award, Target, Heart } from "lucide-react"
import { useTranslation } from "react-i18next"

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

function About() {
  const { t } = useTranslation(['landingPage', 'about'])
  const { step1, step2, step3, step4 } = t('workflow', { returnObjects: true, ns: 'landingPage' }) as Workflow

  const workflowSteps = [step1, step2, step3, step4]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-primary to-blue-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              {t('hero.title', { ns: 'about' })}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle', { ns: 'about' })}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('mission.title', { ns: 'about' })}</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('mission.paragraph1', { ns: 'about' })}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('mission.paragraph2', { ns: 'about' })}
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('features.title', { ns: 'about' })}</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <MessageCircle className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('features.realConversations.title', { ns: 'about' })}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('features.realConversations.description', { ns: 'about' })}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('features.earnWhileLearn.title', { ns: 'about' })}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('features.earnWhileLearn.description', { ns: 'about' })}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Globe className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('features.globalCommunity.title', { ns: 'about' })}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('features.globalCommunity.description', { ns: 'about' })}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Award className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('features.trackProgress.title', { ns: 'about' })}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('features.trackProgress.description', { ns: 'about' })}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Target className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('features.personalizedLearning.title', { ns: 'about' })}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('features.personalizedLearning.description', { ns: 'about' })}
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Heart className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('features.culturalExchange.title', { ns: 'about' })}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('features.culturalExchange.description', { ns: 'about' })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('howItWorks.title', { ns: 'about' })}</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {workflowSteps.map((step, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary via-primary to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('cta.title', { ns: 'about' })}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle', { ns: 'about' })}
          </p>
          <button 
            onClick={() => window.location.href = '/signup'}
            className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            {t('cta.button', { ns: 'about' })}
          </button>
        </div>
      </section>
    </div>
  )
}

export default About
