import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, Briefcase, GraduationCap, Award, TrendingUp, Download } from 'lucide-react';
import { ProfileAnalysis } from '@/types/linkedin';
import ExportButton from './ExportButton';

interface AnalysisResultsProps {
  analysis: ProfileAnalysis;
  onReset: () => void;
}

export default function AnalysisResults({ analysis, onReset }: AnalysisResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={onReset}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Analyzer
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile Analysis Results</h1>
              <p className="text-gray-600">{analysis.profile.name}</p>
            </div>
          </div>
          <ExportButton analysis={analysis} />
        </div>

        {/* Overall Score Card */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Overall Profile Score</h2>
                <p className="text-gray-600">Based on comprehensive analysis of profile elements</p>
              </div>
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(analysis.overallScore)} mb-2`}>
                  {analysis.overallScore}
                </div>
                <div className="text-lg text-gray-500">out of 100</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{analysis.profile.name}</h3>
                  <p className="text-gray-600">{analysis.profile.headline}</p>
                  <p className="text-sm text-gray-500">{analysis.profile.location} • {analysis.profile.connections} connections</p>
                </div>
              </CardContent>
            </Card>

            {/* Career Progression */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Career Progression
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{analysis.careerProgression.totalYears}</div>
                      <div className="text-sm text-gray-600">Years of Experience</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{analysis.careerProgression.companiesWorked}</div>
                      <div className="text-sm text-gray-600">Companies Worked</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{analysis.careerProgression.averageTenure}</div>
                      <div className="text-sm text-gray-600">Average Tenure (years)</div>
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-sm">
                        {analysis.careerProgression.careerGrowth} Growth
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-blue-200 pl-4">
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600">{exp.duration} • {exp.location}</p>
                    {exp.description && (
                      <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-indigo-200 pl-4">
                    <h3 className="font-semibold">{edu.school}</h3>
                    <p className="text-indigo-600 font-medium">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.field} • {edu.duration}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Analysis Insights */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Analysis Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysis.insights.map((insight, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-sm">{insight.category}</h3>
                      <span className={`text-sm font-bold ${getScoreColor(insight.score)}`}>
                        {insight.score}%
                      </span>
                    </div>
                    <Progress value={insight.score} className="mb-2" />
                    <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Skills */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Top Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {analysis.skills.slice(0, 8).map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-sm">{skill.name}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {skill.level}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{skill.endorsements}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Strengths & Improvements */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-green-700 mb-2">Strengths</h3>
                  <ul className="space-y-1">
                    {analysis.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium text-orange-700 mb-2">Areas for Improvement</h3>
                  <ul className="space-y-1">
                    {analysis.areasForImprovement.map((area, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}