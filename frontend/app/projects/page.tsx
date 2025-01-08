const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

/** 
 * Fetch "Project" collection from Strapi.
 */
async function getProjects() {
  const res = await fetch(`${STRAPI_URL}/api/projects?populate=*`, {
    cache: 'no-store', // always fetch fresh (SSR)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch projects from Strapi');
  }

  const data = await res.json();
  data.data.sort((a: any, b: any) => a.order - b.order)
  return data?.data;
}

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen">
      <div className="mx-auto px-8 py-16 pt-32 max-w-2xl">
        <h1 className="text-lg font-bold mb-4 text-title">
          Projects
        </h1>
        <p className="mb-8 text-gray-600">
          Here are some of my publically available projects! Click on a project to view its GitHub repository.
        </p>

        {/* Simple List Layout */}
        <div className="space-y-6">
          {projects?.map((proj: any) => {
            // Destructure project data
            const { id, title, description, techStack, githubLink } = proj;

            return (
              <a
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
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}

