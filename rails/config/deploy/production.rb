# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary server in each group
# is considered to be the first unless any hosts have the primary
# property set.  Don't declare `role :all`, it's a meta role.

role :app, %w{deployer@playlytics}
role :web, %w{deployer@playlytics}
role :db,  %w{deployer@playlytics}


# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server definition into the
# server list. The second argument is a, or duck-types, Hash and is
# used to set extended properties on the server.

# server 'example.com', user: 'deploy', roles: %w{web app}, my_property: :my_value


# Custom SSH Options
# ==================
# You may pass any option but keep in mind that net/ssh understands a
# limited set of options, consult[net/ssh documentation](http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start).
#
# Global options
# --------------
#  set :ssh_options, {
#    keys: %w(/home/rlisowski/.ssh/id_rsa),
#    forward_agent: false,
#    auth_methods: %w(password)
#  }
#
# And/or per server (overrides global)
# ------------------------------------
# server 'example.com',
#   user: 'user_name',
#   roles: %w{web app},
#   ssh_options: {
#     user: 'user_name', # overrides user setting above
#     keys: %w(/home/user_name/.ssh/id_rsa),
#     forward_agent: false,
#     auth_methods: %w(publickey password)
#     # password: 'please use keys'
#   }

set :repo_url, 'git@github.com:gil/playlytics.git'
set :branch, 'new_version'

namespace :deploy do
  desc 'Install client dependencies'
  task :client_dependencies do
    on roles(:app) do

      within release_path.join('client') do
        execute :npm, :install
        execute :bower, :install, "--config.interactive=false"
      end

    end
  end

  before :updated, :client_dependencies

  desc 'Build client'
  task :build_client do
    on roles(:app) do

      within release_path.join('client') do
        execute :gulp, :build
      end

    end
  end

  after :updated, :build_client
end