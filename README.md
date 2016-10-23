# File sorting utility

This is a single-purpose tool I threw together to organize pics and videos from a recent trip to Morroco that were taken on several
devices into folders sorted by date. There were about 6,000 files to sort. I was suffering from jetlag and didn't have to be at work for
a few hours yet. I do this kind of thing often enough though; I'll probably be using this tool again.

The most interesting thing about this code, to me anyway, was the work queue. It occurred to me that passing a potentially
limitless number of files to `fs` to be copied might not be the best idea, so the queue limits the number of files being copied at a time
to a fairly low number. Maybe I'll rework this using functional practices and `async`/`await`.
