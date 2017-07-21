#!/usr/bin/perl

@terms_chs = (
	"程序",
	"文件",
	"缺省",
	"调用",
	"接口",
);

@terms_cht = (
	"程式",
	"檔案",
	"預設",
	"呼叫",
	"介面",
);

@files = (
	"java-china-init.ejs",
	"java-china-user.ejs",
	"java-china-pay.ejs",
	"java-china-aux.ejs",
	"unity-china-init.ejs",
	"unity-china-user.ejs",
	"unity-china-pay.ejs",
	"unity-china-aux.ejs"
);

print "git add";
foreach $f (@files) {
	convert("zh-cn/$f", "zh-hk/$f");
	convert("zh-cn/$f", "zh-tw/$f");
}
print "\n";

sub convert
{
	my $src = shift;
	my $dst = shift;

	print " $dst";
	my $cmd = "opencc -i $src -o $dst";
	system($cmd);
	if ($dst =~ /unity-china-init/) {
		patch_image($dst);
	}
	patch_terms($dst);
}

sub patch_image
{
	my $file = shift;
	my $fh;

	my @lines = `cat $file`;
	open($fh, ">", $file) || die "Cannot write to $file!\n";
	foreach $l (@lines) {
		if ($l =~ /^(.*)\"assets\/img\/\" \+ lang \+(.*)$/) {
			$l = $1 . "\"assets/img/\" + \"zh-cn\" +" . $2 . "\n";
		} 
		print $fh $l;
	}
	close($fh);
}

sub patch_terms
{
	my $file = shift;
	my $fh;

	my @lines = `cat $file`;
	open($fh, ">", $file) || die "Cannot write to $file!\n";
	foreach $l (@lines) {
		$l = convert_terms($l);
		print $fh $l;
	}
	close $fh;
}

sub convert_terms
{
	my $text = shift;
	for (my $i = 0; $i <= $#terms_chs; $i++) {
		my $s = @terms_chs[$i];
		my $t = @terms_cht[$i];
		$text =~ s/$s/$t/g;
	}
	return $text;
}

