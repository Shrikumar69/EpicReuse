import fs from 'fs';
import path from 'path';

const MAX_SECTION_LENGTH = 8000; // Increased to get more comprehensive context

/**
 * Reads a file and returns its content, truncating if it exceeds the maximum length
 * @param filePath Path to the file
 * @returns The file content as a string
 */
export const readFileWithTruncation = (filePath: string): string => {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return '';
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Ensure we get the complete class structure including imports and the entire class definition
    if (content.length > MAX_SECTION_LENGTH) {
      // Look for important structural elements
      const importRegex = /import.*from.*/g;
      const classRegex = /export\s+class\s+\w+/g;
      const constructorRegex = /constructor\s*\(/g;
      const methodRegex = /async\s+\w+\s*\(/g;
      
      // Get all matches
      const importMatches = [...content.matchAll(importRegex)];
      const classMatches = [...content.matchAll(classRegex)];
      const constructorMatches = [...content.matchAll(constructorRegex)];
      const methodMatches = [...content.matchAll(methodRegex)];
      
      let extractedContent = '';
      
      // Add imports
      importMatches.forEach(match => {
        const line = content.substring(match.index!, match.index! + 200).split('\n')[0];
        extractedContent += line + '\n';
      });
      
      extractedContent += '\n';
      
      // Add class definition and constructor
      if (classMatches.length > 0 && constructorMatches.length > 0) {
        const classStart = classMatches[0].index!;
        const constructorEnd = constructorMatches[0].index! + 500;
        const classDefSection = content.substring(classStart, constructorEnd);
        extractedContent += classDefSection.split('\n').slice(0, 20).join('\n') + '\n';
      }
      
      // Add 3 complete methods to provide code style examples
      const methodSamples = methodMatches.slice(0, 3);
      methodSamples.forEach(match => {
        const methodStart = match.index!;
        const methodSection = content.substring(methodStart, methodStart + 800);
        const lines = methodSection.split('\n');
        let closingBraceFound = false;
        let methodLines = [];
        
        // Find complete method by matching braces
        for (let i = 0; i < lines.length && !closingBraceFound; i++) {
          methodLines.push(lines[i]);
          if (lines[i].trim() === '}') {
            closingBraceFound = true;
          }
        }
        
        extractedContent += '\n' + methodLines.join('\n');
      });
      
      // Add the closing brace of the class
      extractedContent += '\n}';
      
      return extractedContent;
    }
    
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '';
  }
};

/**
 * Recursively reads all files with a specific extension from a directory
 * @param dirPath Directory path
 * @param extension File extension to filter by
 * @returns Object with filename as key and content as value
 */
export const readFilesWithExtension = (
  dirPath: string, 
  extension: string,
  maxFiles = 5, // Reduced to focus on quality over quantity
  formNameFilter?: string // Optional form name filter
): Record<string, string> => {
  const result: Record<string, string> = {};
  let fileCount = 0;
  
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}`);
    return result;
  }
  
  // First prioritize files at the root level that match common naming patterns
  const priorityPatterns = formNameFilter 
    ? [
        new RegExp(formNameFilter, 'i'), // Form name as highest priority
        /helper/i,
        /funcs/i,
        /po/i
      ]
    : [
        /helper/i,
        /funcs/i,
        /po/i,
        /function/i,
        /util/i,
        /common/i
      ];
  
  const readDir = (currentPath: string, depth = 0) => {
    if (fileCount >= maxFiles) return;
    
    try {
      const items = fs.readdirSync(currentPath);
      
      // First pass - check for priority files
      if (depth === 0) {
        for (const pattern of priorityPatterns) {
          if (fileCount >= maxFiles) break;
          
          for (const item of items) {
            if (fileCount >= maxFiles) break;
            
            const itemPath = path.join(currentPath, item);
            const stats = fs.statSync(itemPath);
            
            if (stats.isFile() && item.endsWith(extension) && pattern instanceof RegExp && pattern.test(item)) {
              result[item] = readFileWithTruncation(itemPath);
              fileCount++;
              console.log(`Found priority file: ${item}`);
            }
          }
        }
      }
      
      // Second pass - add remaining files
      for (const item of items) {
        if (fileCount >= maxFiles) break;
        
        const itemPath = path.join(currentPath, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory() && depth < 2) { // Limit recursion depth
          readDir(itemPath, depth + 1);
        } else if (stats.isFile() && item.endsWith(extension) && !result[item]) {
          // If form name filter is provided, only include files that match the filter
          if (formNameFilter && !new RegExp(formNameFilter, 'i').test(item)) {
            continue;
          }
          result[item] = readFileWithTruncation(itemPath);
          fileCount++;
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${currentPath}:`, error);
    }
  };
  
  readDir(dirPath);
  return result;
};

/**
 * Process HTML content for analysis
 * @param htmlContent Raw HTML content
 * @returns Processed HTML with contextually important parts highlighted
 */
export const processHtmlForAnalysis = (htmlContent: string): string => {
  if (!htmlContent) return '';
  
  // Clean up HTML first
  let processedHtml = htmlContent
    .replace(/\\n/g, '\n')  // Fix escaped newlines
    .replace(/\\"/g, '"')   // Fix escaped quotes
    .replace(/\\t/g, '  ')  // Fix escaped tabs
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')  // Remove scripts
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');    // Remove styles
  
  // Extract and highlight important elements
  const formElements = processedHtml.match(/<(input|select|button|textarea)[\s\S]*?>/gi) || [];
  const formTags = processedHtml.match(/<form[\s\S]*?<\/form>/gi) || [];
  const tableTags = processedHtml.match(/<table[\s\S]*?<\/table>/gi) || [];
  const divWithClassTags = processedHtml.match(/<div class=["'][^"']*["'][\s\S]*?<\/div>/gi) || [];
  
  // Extract attributes that might be used for selectors
  const epguidElements = processedHtml.match(/epguid=["'][^"']*["']/gi) || [];
  const idElements = processedHtml.match(/id=["'][^"']*["']/gi) || [];
  const nameElements = processedHtml.match(/name=["'][^"']*["']/gi) || [];
  const dataTestIdElements = processedHtml.match(/data-test-id=["'][^"']*["']/gi) || [];
  const classElements = processedHtml.match(/class=["'][^"']*["']/gi) || [];
  
  // Build a summary of important elements
  let summary = '<!-- IMPORTANT ELEMENTS SUMMARY -->\n';
  
  // Extract form name or identifier from various attributes
  const formIdentifiers = new Set<string>();
  // Extract from IDs
  processedHtml.match(/id=["']([^"']*)["']/gi)?.forEach(match => {
    const id = match.replace(/id=["']([^"']*)["']/i, '$1');
    if (id.includes('form') || id.includes('Form') || id.includes('page') || id.includes('Page')) {
      formIdentifiers.add(id);
    }
  });
  
  // Extract from classes
  processedHtml.match(/class=["']([^"']*)["']/gi)?.forEach(match => {
    const className = match.replace(/class=["']([^"']*)["']/i, '$1');
    if (className.includes('form') || className.includes('Form') || className.includes('page') || className.includes('Page')) {
      formIdentifiers.add(className);
    }
  });
  
  if (formIdentifiers.size > 0) {
    summary += '<!-- Form Identifiers -->\n';
    formIdentifiers.forEach(id => {
      summary += `<!-- ${id} -->\n`;
    });
    summary += '\n';
  }
  
  // Extract form fields with labels
  const formLabelsMap = new Map<string, string>();
  
  // Try to match labels with form fields using for attribute
  const labelMatches = [...processedHtml.matchAll(/<label[^>]*for=["']([^"']*)["'][^>]*>([\s\S]*?)<\/label>/gi)];
  labelMatches.forEach(match => {
    const forAttr = match[1];
    const labelText = match[2].replace(/<[^>]*>/g, '').trim();
    if (forAttr && labelText) {
      formLabelsMap.set(forAttr, labelText);
    }
  });
  
  if (formLabelsMap.size > 0) {
    summary += '<!-- Form Fields with Labels -->\n';
    formLabelsMap.forEach((label, id) => {
      summary += `<!-- ID: ${id}, Label: ${label} -->\n`;
    });
    summary += '\n';
  }
  
  if (epguidElements.length) {
    summary += '<!-- EPGUID Elements -->\n';
    epguidElements.forEach(el => {
      summary += `<!-- ${el} -->\n`;
    });
    summary += '\n';
  }
  
  if (idElements.length) {
    summary += '<!-- ID Elements -->\n';
    idElements.forEach(el => {
      summary += `<!-- ${el} -->\n`;
    });
    summary += '\n';
  }
  
  if (formElements.length) {
    summary += '<!-- Form Elements -->\n';
    formElements.forEach(el => {
      summary += `<!-- ${el} -->\n`;
    });
    summary += '\n';
  }
  
  // Truncate if too large
  const maxHtmlLength = MAX_SECTION_LENGTH - summary.length;
  const truncatedHtml = processedHtml.length > maxHtmlLength 
    ? processedHtml.slice(0, maxHtmlLength) + '\n<!-- ...truncated... -->' 
    : processedHtml;
  
  return summary + truncatedHtml;
};
