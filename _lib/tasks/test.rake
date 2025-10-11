desc "Run RSpec tests"
RSpec::Core::RakeTask.new(:test) do |t|
  t.pattern = File.join(Dir.pwd, './_spec/**/*_spec.rb')
end