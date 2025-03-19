import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-primary/70 mb-4">
              MindMaze
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Challenge your mind with AI-powered quizzes and detailed performance reports.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 dark:text-white">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary">Features</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary">Pricing</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary">Testimonials</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 dark:text-white">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary">About</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary">Blog</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary">Careers</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 dark:text-white">Subscribe</h4>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Get the latest updates and news.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="bg-white dark:bg-zinc-800" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            © {new Date().getFullYear()} MindMaze. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
