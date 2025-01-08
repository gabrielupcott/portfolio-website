import React, { JSX } from 'react'

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'

// Fetch data from Strapi
async function getExperiences() {
  const res = await fetch(`${STRAPI_URL}/api/experiences?populate=*`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch experiences from Strapi')
  }
  const data = await res.json()
  // sort by order field
  data.data.sort((a: any, b: any) => a.order - b.order)

  return data?.data
}

/**
 * Renders the "description" array (blocks) from Strapi.
 * Each block can be paragraph, heading, list, etc.
 */
function renderBlocks(blocks: any[] = []) {
  return blocks.map((block, idx) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={idx} className="mb-4 text-gray-800">
            {renderChildren(block.children)}
          </p>
        )

      case 'heading': {
        const level = block.level || 1
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag key={idx} className="font-semibold my-3 text-gray-900">
            {renderChildren(block.children)}
          </HeadingTag>
        )
      }

      case 'list':
        // For an unordered list, we use <ul>.
        // If you had a "format" of "ordered", you could render <ol>.
        if (block.format === 'unordered') {
          return (
            <ul key={idx} className="list-disc list-inside mb-4">
              {block.children.map((childBlock: any, childIdx: number) => {
                // childBlock might be a "list-item" or a nested "list"
                return renderBlocks([childBlock]) // Reuse renderBlocks
              })}
            </ul>
          )
        } else {
          // If there's a "format: ordered" case:
          return (
            <ol key={idx} className="list-decimal list-inside mb-4">
              {block.children.map((childBlock: any, childIdx: number) => {
                return renderBlocks([childBlock])
              })}
            </ol>
          )
        }

      case 'list-item':
        return (
          <li key={idx} className="mb-1 text-gray-800">
            {renderChildren(block.children)}
          </li>
        )

      default:
        // If we don’t recognize the block, return null or debug info
        return null
    }
  })
}

/**
 * Renders an array of "child" nodes for paragraphs, headings, list items, etc.
 * Each child might be { type: "text", text: "some string", bold: boolean, ... }
 */
function renderChildren(children: any[] = []) {
  return children.map((child, index) => {
    if (child.type === 'text') {
      // If bold is true, wrap in <strong>
      if (child.bold) {
        return (
          <strong key={index}>
            {child.text}
          </strong>
        )
      } else {
        return <React.Fragment key={index}>{child.text}</React.Fragment>
      }
    }
    // If a child is another block, we might call renderBlocks again,
    // but typically "children" here are just text nodes. 
    return null
  })
}

export default async function ExperiencePage() {
  const experiences = await getExperiences()

  return (
    <main className="min-h-screen">
      <div className="mx-auto px-8 py-16 max-w-2xl">
        <h1 className="text-lg font-bold mb-4 text-title">
          Experience
        </h1>

        <p className="mb-6 text-gray-600">
          What I've worked on professionally along with my education.
        </p>

        <div className="space-y-8">
          {experiences?.map((exp: any) => {
            const { id, role, company, startDate, endDate, description } = exp

            return ( 
              <div key={id} className='border-t border-gray-200 pt-4 hover:bg-gray-200/60 px-8 rounded'>
                {/* Role & Company */}
                <h2 className="font-semibold text-lg mb-1 text-gray-800">{role}</h2>
                {company && (
                  <p className="text-sm text-gray-600">
                    {company} | {startDate} - {endDate? endDate : 'Present'}
                  </p>
                )}

                {/* Render the block array */}
                <div className="mt-4">
                  {renderBlocks(description)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}