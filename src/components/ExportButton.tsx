import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileText, FileJson } from 'lucide-react';
import { ProfileAnalysis } from '@/types/linkedin';
import { exportAnalysisToJson, exportAnalysisToText } from '@/lib/linkedinAnalyzer';

interface ExportButtonProps {
  analysis: ProfileAnalysis;
}

export default function ExportButton({ analysis }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportJson = async () => {
    setIsExporting(true);
    try {
      const jsonContent = exportAnalysisToJson(analysis);
      const filename = `linkedin-analysis-${analysis.profile.name.replace(/\s+/g, '-').toLowerCase()}.json`;
      downloadFile(jsonContent, filename, 'application/json');
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportText = async () => {
    setIsExporting(true);
    try {
      const textContent = exportAnalysisToText(analysis);
      const filename = `linkedin-analysis-${analysis.profile.name.replace(/\s+/g, '-').toLowerCase()}.txt`;
      downloadFile(textContent, filename, 'text/plain');
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          disabled={isExporting}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {isExporting ? 'Exporting...' : 'Export Results'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleExportText} className="cursor-pointer">
          <FileText className="mr-2 h-4 w-4" />
          Export as Text
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportJson} className="cursor-pointer">
          <FileJson className="mr-2 h-4 w-4" />
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}