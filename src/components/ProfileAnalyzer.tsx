import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Search, AlertCircle } from 'lucide-react';
import { validateLinkedInUrl, generateMockAnalysis } from '@/lib/linkedinAnalyzer';
import { ProfileAnalysis } from '@/types/linkedin';
import AnalysisResults from './AnalysisResults';

export default function ProfileAnalyzer() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ProfileAnalysis | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setError('');
    
    if (!url.trim()) {
      setError('Please enter a LinkedIn profile URL');
      return;
    }

    if (!validateLinkedInUrl(url)) {
      setError('Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const mockAnalysis = generateMockAnalysis(url);
        setAnalysis(mockAnalysis);
      } catch (err) {
        setError('Failed to analyze profile. Please try again.');
      } finally {
        setIsAnalyzing(false);
      }
    }, 2000);
  };

  const handleReset = () => {
    setUrl('');
    setAnalysis(null);
    setError('');
  };

  if (analysis) {
    return <AnalysisResults analysis={analysis} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <img 
              src="/assets/linkedin-analyzer-hero.jpg" 
              alt="LinkedIn Profile Analyzer" 
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            LinkedIn Profile Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get AI-powered insights and professional analysis of LinkedIn profiles. 
            Discover strengths, areas for improvement, and optimization recommendations.
          </p>
        </div>

        {/* Main Analysis Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800">Analyze LinkedIn Profile</CardTitle>
            <CardDescription className="text-lg">
              Enter a LinkedIn profile URL to get detailed professional insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
              <label htmlFor="linkedin-url" className="text-sm font-medium text-gray-700">
                LinkedIn Profile URL
              </label>
              <div className="flex gap-3">
                <Input
                  id="linkedin-url"
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 h-12 text-lg"
                  disabled={isAnalyzing}
                />
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="h-12 px-8 bg-blue-600 hover:bg-blue-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Example URLs */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Example URLs:</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div 
                  className="cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => setUrl('https://linkedin.com/in/zair-tairov-55570920')}
                >
                  • https://linkedin.com/in/zair-tairov-55570920
                </div>
                <div 
                  className="cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => setUrl('https://linkedin.com/in/john-doe-123')}
                >
                  • https://linkedin.com/in/john-doe-123
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Analysis Features:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Profile completeness score
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Career progression analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Skills assessment
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Insights Provided:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    Professional strengths
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    Improvement recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    Network analysis
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}