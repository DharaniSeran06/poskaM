'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

// Suppress React warning about disableTransition prop from Sanity Studio
// This is a known issue with Sanity Studio's internal components
// Must be set at module level before any React components render
if (typeof window !== 'undefined') {
  const originalError = console.error
  const originalWarn = console.warn
  
  const shouldSuppress = (args: any[]): boolean => {
    // Check if any argument contains the disableTransition warning
    const checkArg = (a: any): boolean => {
      if (typeof a === 'string') {
        const lower = a.toLowerCase()
        // Match various forms of the disableTransition warning
        return (
          lower.includes('disabletransition') ||
          lower.includes('react does not recognize') ||
          (lower.includes('prop') && lower.includes('dom element') && (lower.includes('disable') || lower.includes('transition'))) ||
          (lower.includes('custom attribute') && (lower.includes('disable') || lower.includes('transition'))) ||
          (lower.includes('spell it as lowercase') && lower.includes('disable'))
        )
      }
      if (Array.isArray(a)) {
        return a.some(checkArg)
      }
      if (a && typeof a === 'object') {
        return Object.values(a).some(checkArg)
      }
      return false
    }
    
    // Check all arguments - also check if the error message is in the stack trace
    const allArgsString = args.map(a => String(a)).join(' ').toLowerCase()
    if (allArgsString.includes('disabletransition') || 
        (allArgsString.includes('react does not recognize') && allArgsString.includes('prop'))) {
      return true
    }
    
    return args.some(checkArg)
  }
  
  console.error = (...args: any[]) => {
    if (shouldSuppress(args)) {
      return
    }
    originalError.apply(console, args)
  }
  
  console.warn = (...args: any[]) => {
    if (shouldSuppress(args)) {
      return
    }
    originalWarn.apply(console, args)
  }
}

export default function StudioClient() {
  return <NextStudio config={config} />
}
