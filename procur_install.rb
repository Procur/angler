#!/usr/bin/env ruby

require 'fileutils'
include FileUtils
puts "Running procur_install.rb..."
pdir = ARGV[0] || File.dirname(__FILE__)
cd pdir

puts "Attempting GitHooks installation..."
# Git hooks installation
pre_commit = File.open('.git/hooks/pre-commit', 'w')
puts "Created file .git/hooks/pre-commit."

pre_commit_hook = %q{#!/usr/bin/env ruby

module GitHooks
  def self.only
    only = %x[ git grep -i "\\\.only" ].gsub(':', ':   ').split "\n"
    only.reject! { |o| o.include? 'procur_install.rb' }
    exit 0 if only.count < 1

    puts "COMMIT ABORTED!"
    puts "Looks like you have #{only.count} unresolved tests:\n\n"
    only.each { |match| puts "\t#{match}" }
    puts "\nResolve these errors and retry your commit, or run \`git commit --no-verify\` to skip this hook."

    exit 1
  end
end

GitHooks::only
}

pre_commit << pre_commit_hook
pre_commit.close
chmod '+x', '.git/hooks/pre-commit'
puts "GitHooks installation complete."

puts "Successfully ran procur_install.rb, no errors."
