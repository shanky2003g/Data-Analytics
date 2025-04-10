"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 text-white">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="text-white hover:text-white/80 hover:bg-white/10">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300">
            Project Information
          </h1>
          <p className="mt-4 text-lg text-purple-200 max-w-2xl mx-auto">
            Academic Research Project on Stock Price Prediction Using Deep Learning and Sentiment Analysis
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 bg-indigo-900/40 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="guidance">Guidance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <Card className="bg-indigo-900/30 backdrop-blur-md border-indigo-600/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-200">Project Details</CardTitle>
                  <CardDescription className="text-purple-300">
                    Department of Information Technology
                    <br />
                    National Institute of Technology Karnataka, 575025
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">Course</h3>
                    <p className="text-purple-100">Data Analytics (IT350)</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">Project Title</h3>
                    <p className="text-purple-100 text-lg font-medium">
                      A Stock Price Prediction Model Based on Investor Sentiment and Optimized Deep Learning
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">Academic Year</h3>
                    <p className="text-purple-100">January - April 2025</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">Abstract</h3>
                    <p className="text-purple-100">
                      This project explores the integration of investor sentiment analysis with optimized deep learning
                      models to predict stock price movements with greater accuracy. By combining traditional technical
                      analysis with natural language processing of financial news and social media, we've developed a
                      hybrid model that outperforms conventional prediction approaches.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="mt-8">
              <Card className="bg-indigo-900/30 backdrop-blur-md border-indigo-600/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-200">Team Members</CardTitle>
                  <CardDescription className="text-purple-300">Project carried out by</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: "Shashank Jain", id: "221IT061", role: "Machine Learning Model Development" },
                    { name: "Shashank Gupta", id: "221IT062", role: "Data Processing & Feature Engineering" },
                    { name: "Vineet Jain", id: "221IT081", role: "Sentiment Analysis & Integration" },
                  ].map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-indigo-800/40 border border-indigo-600/40"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mb-4 mx-auto">
                        <span className="text-xl font-bold">{member.name.charAt(0)}</span>
                      </div>
                      <h3 className="text-center text-lg font-medium text-purple-200 mb-1">{member.name}</h3>
                      <p className="text-center text-purple-300 text-sm mb-2">{member.id}</p>
                      <p className="text-center text-purple-400 text-xs">{member.role}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guidance" className="mt-8">
              <Card className="bg-indigo-900/30 backdrop-blur-md border-indigo-600/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-200">Project Guidance</CardTitle>
                  <CardDescription className="text-purple-300">Under the supervision of</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-5 rounded-lg bg-indigo-800/40 border border-indigo-600/40">
                    <h3 className="text-xl font-semibold mb-1 text-blue-300">Course Instructor</h3>
                    <p className="text-purple-100 text-lg">Dr. Nagmma Patil</p>
                    <p className="text-purple-300 text-sm">Department of Information Technology, NITK</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Prajna Bhat", role: "Teaching Assistant & Evaluator" },
                      { name: "Abhishek Sunil Bhamare", role: "Teaching Assistant & Evaluator" },
                    ].map((guide, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 rounded-lg bg-indigo-800/40 border border-indigo-600/40"
                      >
                        <h3 className="text-lg font-medium text-purple-200 mb-1">{guide.name}</h3>
                        <p className="text-purple-300 text-sm">{guide.role}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-5 rounded-lg bg-indigo-800/40 border border-indigo-600/40">
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">Acknowledgements</h3>
                    <p className="text-purple-100">
                      We would like to express our sincere gratitude to our professor and teaching assistants for their
                      continuous support and guidance throughout this project. Their expertise and feedback were
                      invaluable in shaping our research methodology and implementation approach.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
