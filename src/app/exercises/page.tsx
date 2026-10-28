import Link from "next/link"
import { PageHeader, Section, Breadcrumb } from "@/components/course"
import { syllabusModules } from "@/data/syllabus"
import { getExercise } from "@/lib/exercises"
import { getLabTask } from "@/lib/consensus"
import { ExerciseProgressBadge } from "@/components/course/ExerciseProgressBadge"
import { WorkspaceProgressBadge } from "@/components/course/WorkspaceProgressBadge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Puzzle, GitBranch, ArrowRight, Clock, Dumbbell } from "lucide-react"

export const metadata = {
  title: "Exercises | Mathematics of Cryptography",
  description:
    "Guided drag-and-drop exercises and reasoning trees for every lesson in Mathematics of Cryptography.",
}

export default function ExercisesPage() {
  const totalLessons = syllabusModules.reduce((acc, m) => acc + m.lessons.length, 0)
  const covered = syllabusModules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => getExercise(l.slug) || getLabTask(l.slug)).length,
    0
  )

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: "Exercises" }]} />

      <PageHeader
        badge="Practice"
        title="Guided Exercises & Reasoning Trees"
        description="Drag-and-drop construction exercises and a persistent reasoning tree for every lesson. Interactive content lands module by module — check each lesson's status below."
      >
        <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-primary" />
            <span>
              <strong>{covered}</strong> of <strong>{totalLessons}</strong> lessons have interactive content
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Puzzle className="h-4 w-4 text-primary" />
            <span>Exercise — assemble the algorithm, step by step</span>
          </div>
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-primary" />
            <span>Reasoning tree — argue the proofs, grow the tree</span>
          </div>
        </div>
      </PageHeader>

      <div className="space-y-10">
        {syllabusModules.map((module, moduleIndex) => (
          <Section key={module.id}>
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <h2 className="text-xl font-bold leading-snug">
                <Link href={`/modules/${module.slug}`} className="hover:text-primary transition-colors">
                  {module.title}
                </Link>
              </h2>
              {module.estimatedTime && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                  <Clock className="h-3.5 w-3.5" />
                  {module.estimatedTime}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {module.lessons.map((lesson) => {
                const exercise = getExercise(lesson.slug)
                const task = getLabTask(lesson.slug)
                const hasContent = Boolean(exercise || task)
                const lessonLabel = `${moduleIndex + 1}.${lesson.order}`

                return (
                  <Card key={lesson.id} className="flex flex-col justify-between hover:shadow-md transition-shadow">
                    <CardHeader className="space-y-2 pb-3">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="secondary" className="font-semibold text-xs">
                          Lesson {lessonLabel}
                        </Badge>
                        {lesson.estimatedTime && (
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {lesson.estimatedTime}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-base font-semibold leading-snug">{lesson.title}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap items-center gap-3">
                        {exercise && <ExerciseProgressBadge labSlug={lesson.slug} steps={exercise.steps} />}
                        {task && <WorkspaceProgressBadge labSlug={lesson.slug} goldTotal={task.goldTree.nodes.length} />}
                        {!hasContent && (
                          <Badge variant="outline" className="text-muted-foreground">
                            Coming soon
                          </Badge>
                        )}
                        {hasContent && (
                          <Link
                            href={`/modules/${module.slug}/${lesson.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline ml-auto"
                          >
                            Start <ArrowRight className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </Section>
        ))}
      </div>
    </div>
  )
}
