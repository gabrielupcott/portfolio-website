import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto px-8 py-16 pt-32 max-w-2xl">
        <h1 className="text-lg font-bold mb-4 text-gray-800">
          Gabriel (Nicolas) Upcott
        </h1>

        <p className="mb-4">
          I’m a new software development graduate and aspiring software engineer who loves creating
          modern web applications.
        </p>

        <p className="mb-4">I'm currently seeking full-time opportunities!</p>

        <p className="mb-4">
          Check out my{' '}
          <a
            href="/projects"
            className="text-black bg-teal-100/75 rounded hover:opacity-70"
          >
            recent work
          </a>{' '}
          or my{' '}
          <a
            href="/experience"
            className="text-black bg-lime-200/50 rounded hover:opacity-70"
          >
            experiences
          </a>{' '}
          to learn more, <br/>
          or{' '}
          <a
            href="/resume.pdf"
            className="underline text-black hover:text-gray-600 transition-colors underline-offset-4 decoration-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            download my resume (PDF)
          </a>{''}.
          <br/>
          <br/>
          ↓ feel free to get in touch below ↓
        </p>

        {/* Icon Buttons */}
        <div className="flex space-x-4 mt-3">
          {/* Email Icon */}
          <a
            href="mailto:gabrielcupcott@gmail.com"
            className="inline-block p-3 bg-white rounded-md transition-colors *:hover:text-gray-400"
          >
            <FaEnvelope className="w-5 h-5 text-gray-900" />
          </a>

          {/* GitHub Icon */}
          <a
            href="https://github.com/gabrielupcott"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block p-3 bg-white rounded-md transition-colors *:hover:text-gray-400"
          >
            <FaGithub className="w-5 h-5 text-gray-900" />
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://linkedin.com/in/gabrielupcott"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block p-3 bg-white rounded-md transition-colors *:hover:text-gray-400"
          >
            <FaLinkedin className="w-5 h-5 text-gray-900" />
          </a>
        </div>
      </div>
    </main>
  )
}
