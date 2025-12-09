import Link from 'next/link';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string;
  githubLink: string;
  order: number;
}

interface StrapiResponse {
  data: Project[];
}

/** 
 * Fetch "Project" collection from Strapi.
 */
async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/projects?populate=*`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch projects from Strapi: ${res.status} ${res.statusText}`);
    }

    const data: StrapiResponse = await res.json();
    data.data.sort((a, b) => a.order - b.order);
    return data.data;
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}
export default async function WorkPage() {
  let projects: Project[] = []
  try {
    projects = await getProjects();
  } catch (error) {
    console.error('Error loading projects:', error);
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto px-8 py-16 pt-32 max-w-2xl">
        <h1 className="text-lg font-bold mb-4 text-title">
          Projects
        </h1>
        <p className="mb-8 text-gray-600">
          Here are some of my publically available projects! Click on a project to view its GitHub repository.
        </p>

        {/* Check if projects array is empty */}
        {projects.length === 0 ? (
          <p className="text-red-600">Failed to load projects... <br/><br/> Double check your connection or just checkout my GitHub linked on the home page!</p>
        ) : (
          <div className="space-y-6">
            {projects.map((proj) => {
              // Destructure project data
              const { id, title, description, techStack, githubLink } = proj;

              return (
                <Link
                  key={id}
                  href={githubLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-gray-200/75 p-2 rounded transition-colors"
                >
                  <div className="flex items-center space-x-4 pb-2">
                    {/* Title */}
                    <h3 className="font-semibold text-gray-800">{title}</h3>

                    {/* Tech Stack Tags Inline */}
                    {techStack &&
                      techStack.split(',').map((tech: string, index: number) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-200 text-gray-700 py-1 px-2 rounded-full"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                  </div>
                  {/* Description */}
                  <p className="text-sm text-gray-600">{description}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

