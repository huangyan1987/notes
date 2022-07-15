Spacemacs

In visual mode (NO SPC):
K      SPC m h h (lookup help)
C-x u  show undo tree
gt   next workspace
gT   prev workspace


SPC then...:
qr     restart emacs

lw     layout transient state
lw2    create second workspace

pl     open new project in layout

z      folding (no SPC needed)
za     toggle fold
zc     close fold 
zo     open fold 
zm     close folds
zr     open folds

jj   jump to char
jJ   jump to 2 chars
jv   jump to variable

tg   toggle golden ratio (auto max window)
tp   toggle smartparens
Ts   toggle safe structure parens

wu   undo window change

m  major mode command
,      SPC m

After pressing ,
'      Connect to CIDER repl
eb     eval buffer
ee     eval sexp ending at cursor
ef     eval function
er     eval region
ha     apropos
hh     doc
hn     browse ns (like clojure.core or clojure.string...)
si     Connect to CIDER repl
sc     Connect to running repl
sb     send buffer to repl
se     send sexp ending at cursor to repl
sf     send function to repl
sr     send region to repl
ss     show repl
sq     quit repl
ta     run tests, all
tt     run test at cursor
rtf    refactor, threading, first -> (cursor at first paren)
rtl    refactor, threading, last  ->>
Te     toggle enlightened mode (?)
Tt     toggle auto-test mode

Org mode
`M-<arrows>    move lines up/down/left/right`

Clojure + CIDER + Spacemacs
Add to ~/.lein/profiles.clj

{:repl {:plugins [[cider/cider-nrepl "0.10.0-SNAPSHOT"]
                  [refactor-nrepl "2.0.0-SNAPSHOT"]]
        :dependencies [[alembic "0.3.2"]
                       [org.clojure/tools.nrepl "0.2.12"]]}}
